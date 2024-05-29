type Props = {
  params: {
    slug: string;
  };
};

export default function PreviewPage({ params }: Props) {
  const { slug } = params;
  return <div>PreviewPage {slug}</div>;
}
