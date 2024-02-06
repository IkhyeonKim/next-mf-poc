import useModule from "@/hooks/useModule";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

const remoteVars = process.env.REMOTES || {};

type PageParams = {
  params: {
    slug: string;
  };
};

export default function ApcPage({ params }: PageParams) {
  const router = useRouter();
  const pathname = usePathname();
  const targetModule: any = useModule(pathname, "apc");

  if (targetModule === undefined || targetModule === "Loading") {
    return <div>Loading...</div>;
  }
  if (targetModule === null) return <div>Module not found</div>;

  return (
    <div>
      APC Portal
      <div>{targetModule}</div>
    </div>
  );
}
