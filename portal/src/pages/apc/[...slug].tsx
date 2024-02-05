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
  const targetModule = useModule(pathname, "apc");
  console.log({ router, pathname, remoteVars });
  return <div>APC: {params?.slug}</div>;
}
