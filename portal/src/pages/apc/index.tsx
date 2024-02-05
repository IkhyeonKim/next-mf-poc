import useIsMount from "@/hooks/useIsMount";
import { Suspense, lazy } from "react";
// const SetupPage = lazy(() => import("apc/Setup"));
// const SetupPage = dynamic(() => import("apc/Setup"), { ssr: false });

// const SetupPage =
//   typeof window === undefined
//     ? () => {
//       console.log("window is undefined");
//       return null;
//     }
//     : // : lazy(() => {
//       //     console.log("window is undefined");
//       //     const mod = import("apc/SetupComponent").catch(console.error);
//       //     return mod;
//       //   });
//       () => {
//         console.log("window is defined");
//         return null;
//       };

const SetupPage =
  typeof window !== "undefined"
    ? lazy(() => {
        const mod = import("apc/Setup");
        return mod;
      })
    : () => null;
// const SetupPage =
//   typeof window !== "undefined"
//     ? dynamic(
//         () => {
//           console.log("@@@");
//           return import("apc/Setup");
//         },
//         { ssr: false }
//       )
//     : () => null;

type PageProps = {
  foo: string;
};

export default function ApcMain({ foo }: PageProps) {
  console.log({ foo });

  const mounted = useIsMount();

  if (!mounted) return <div>Loading!!!</div>;

  return (
    <div>
      Portal APC 😄
      <Suspense fallback={<div>Loading...</div>}>
        <SetupPage />
      </Suspense>
    </div>
  );
}

export async function getStaticProps() {
  const res = {
    foo: "bar",
  };

  return {
    props: {
      ...res,
    },
  };
}
