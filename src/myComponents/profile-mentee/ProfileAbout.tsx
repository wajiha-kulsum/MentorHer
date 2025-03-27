import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Quote } from "lucide-react";

interface ProfileAboutProps {
  about: string;
  isOwnProfile?: boolean;
  onEdit?: () => void;
}

const ProfileAbout = ({ about, isOwnProfile = false, onEdit }: ProfileAboutProps) => {
  return (
    <Card className="mb-6 overflow-hidden border-2 border-accent/30">
      <CardHeader className="pb-3 bg-accent/10">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl flex items-center gap-2">
            <Quote className="h-5 w-5 text-primary/70" />
            About
          </CardTitle>
          {isOwnProfile && (
            <Button variant="ghost" size="sm" onClick={onEdit} className="h-8 w-8 p-0">
              <Pencil className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-5">
        <div className="whitespace-pre-line text-lg leading-relaxed font-light">{about}</div>
      </CardContent>
    </Card>
  );
};

export default ProfileAbout;
