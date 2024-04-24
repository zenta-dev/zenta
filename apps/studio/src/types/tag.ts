interface RemapTag {
  id: string;
  name: string;
  description?: string;
  photo?: string;
}

export interface TagFormProps {
  initialData: RemapTag | undefined;
}
