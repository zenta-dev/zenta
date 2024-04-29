export interface PostFormProps {
  // initialData: Tech | undefined;
  initialData: any;
  tags: {
    description: string | null;
    id: string;
    updatedAt: Date | null;
    name: string;
    photo: string | null;
  }[];
  techs: {
    description: string;
    id: string;
    updatedAt: Date | null;
    name: string;
    logo: string;
  }[];
}
