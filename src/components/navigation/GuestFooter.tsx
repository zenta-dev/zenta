import Link from "next/link";
import { MdRssFeed } from "react-icons/md";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://blog.zenta.dev";
const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Zenta's Blog";

export const GuestFooter = () => {
  return (
    <footer className="flex justify-between max-w-5xl mx-auto p-4">
      <p>
        &copy; {new Date().getFullYear().toString()} by {siteName}
      </p>
      <Link href={`${siteUrl}/rss.xml`} rel="noreferrer" target="_blank">
        <MdRssFeed color="#ee802f" size="30px" />
      </Link>
    </footer>
  );
};
