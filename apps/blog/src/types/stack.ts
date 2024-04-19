// enum StackFounderType {
//   COMPANY,
//   ORGANIZATION,
//   PERSON,
// }

// interface RemapStackFounder {
//   id: string;
//   name: string;
//   type: StackFounderType;
//   url: string;
//   photo?: string;
// }

// interface RemapStackVersion {
//   id: string;
//   version: string;
//   description?: string;
//   whatNews?: string;
//   url?: string;
// }

// interface RemapStack {
//   id: string;
//   name: string;
//   description: string;
//   logo: string;
//   url: string;
//   homepage?: string;
//   versions: RemapStackVersion[];
// }

export interface StackFormProps {
  // initialData: Tech | undefined;
  initialData: any;
}
