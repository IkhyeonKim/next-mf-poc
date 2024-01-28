import { useRouter } from "next/router";

type PageParams = {
  params: {
    slug: string;
  };
};

export default function ApcPage({ params }: PageParams) {
    const router = useRouter()
    console.log({ router });
  return <div>APC: {params?.slug}</div>;
}
