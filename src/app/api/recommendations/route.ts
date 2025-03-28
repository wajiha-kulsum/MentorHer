import { NextResponse } from "next/server";
import { dbConnect } from "../../../../lib/mongodb";
import * as tf from "@tensorflow/tfjs";
import Mentor2 from "../../../models/Mentor2"; // Mentor model (using Mentor2 as defined)
import Mentee from "../../../models/Mentee";

// Combine key fields from a mentee into a single text string.
function combineMentee(mentee: any): string {
  return [
    mentee.careerGoals,
    mentee.mentorshipGoals,
    mentee.challenges || "",
    mentee.technicalBackground,
    mentee.preferredMentorshipAreas ? mentee.preferredMentorshipAreas.join(" ") : ""
  ]
    .filter(Boolean)
    .join(" ");
}

// Combine key fields from a mentor into a single text string.
function combineMentor(mentor: any): string {
  return [
    mentor.mentoringGoals,
    mentor.technicalSkills ? mentor.technicalSkills.join(" ") : "",
    mentor.areasOfInterest ? mentor.areasOfInterest.join(" ") : "",
    mentor.personalBio || ""
  ]
    .filter(Boolean)
    .join(" ");
}

// Build a vocabulary from an array of texts.
function buildVocabulary(texts: string[]): string[] {
  const vocabSet = new Set<string>();
  texts.forEach(text => {
    const tokens = text.split(/\W+/).filter(Boolean);
    tokens.forEach(token => {
      vocabSet.add(token.toLowerCase());
    });
  });
  return Array.from(vocabSet);
}

// Vectorize a text into a bag-of-words vector based on the provided vocabulary.
function vectorizeText(text: string, vocab: string[]): number[] {
  const vector = new Array(vocab.length).fill(0);
  const tokens = text.split(/\W+/).filter(Boolean).map(token => token.toLowerCase());
  tokens.forEach(token => {
    const index = vocab.indexOf(token);
    if (index !== -1) {
      vector[index] += 1;
    }
  });
  return vector;
}

// Compute cosine similarity between two 1D tensors.
function cosineSimilarityTensor(vec1: tf.Tensor1D, vec2: tf.Tensor1D): number {
  const dotProduct = vec1.dot(vec2).dataSync()[0];
  const norm1 = vec1.norm().dataSync()[0];
  const norm2 = vec2.norm().dataSync()[0];
  if (norm1 === 0 || norm2 === 0) return 0;
  return dotProduct / (norm1 * norm2);
}

export async function GET(
  request: Request,
  { params: { userId } }: { params: { userId: string } }
) {
  if (!userId) {
    return NextResponse.json(
      { error: "Missing mentee user id" },
      { status: 400 }
    );
  }

  await dbConnect();

  // Retrieve the mentee profile using the provided userId.
  const mentee = await Mentee.findOne({ userId }).lean();
  if (!mentee) {
    return NextResponse.json(
      { error: "Mentee not found" },
      { status: 404 }
    );
  }

  // Retrieve all mentor profiles.
  const mentors = await Mentor2.find({}).lean();
  if (!mentors || mentors.length === 0) {
    return NextResponse.json(
      { error: "No mentors available" },
      { status: 404 }
    );
  }

  // Combine text fields for mentee and mentors.
  const menteeText = combineMentee(mentee);
  const mentorTexts = mentors.map(mentor => combineMentor(mentor));

  // Build a vocabulary from both mentee and mentor texts.
  const vocab = buildVocabulary([menteeText, ...mentorTexts]);

  // Vectorize the mentee text.
  const menteeVector = vectorizeText(menteeText, vocab);
  const menteeTensor = tf.tensor1d(menteeVector);

  // Compute cosine similarity between the mentee and each mentor.
  const mentorSimilarities = mentors.map((mentor, index) => {
    const mentorVector = vectorizeText(mentorTexts[index], vocab);
    const mentorTensor = tf.tensor1d(mentorVector);
    const similarity = cosineSimilarityTensor(menteeTensor, mentorTensor);
    return { mentor, similarity };
  });

  // Sort mentors by similarity (highest first) and select the top five.
  const recommendations = mentorSimilarities
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 5)
    .map(rec => ({
      similarity: rec.similarity,
      // Return select mentor fields for the recommendation.
      mentor: {
        userId: rec.mentor.userId,
        fullName: rec.mentor.fullName,
        email: rec.mentor.email,
        profilePhoto: rec.mentor.profilePhoto,
        currentRole: rec.mentor.currentRole,
        company: rec.mentor.company,
        mentoringGoals: rec.mentor.mentoringGoals,
        technicalSkills: rec.mentor.technicalSkills,
        areasOfInterest: rec.mentor.areasOfInterest,
      }
    }));

  return NextResponse.json({ recommendations });
}
