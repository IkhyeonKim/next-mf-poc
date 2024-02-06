import { ReactNode, createElement, useEffect, useState } from "react";
import { injectScript } from "@module-federation/utilities";

const remoteVars = process.env.REMOTES || {};

type PageMapType = Record<string, string>;

export default function useModule(pathname: string, remoteAppName: string) {
  const [module, setModule] = useState<
    undefined | null | "Loading" | ReactNode
  >(undefined);

  useEffect(() => {
    async function findModule() {
      setModule("Loading");
      const foundContainer = injectScript(remoteAppName);
      const container = await foundContainer;

      console.log({ remoteVars });

      // FIXME: type issue
      const pageMap: PageMapType = await Promise.resolve(
        container.get("./page-map")
      ).then((factory) => factory().default);

      const oneDepthPath = pathname.split("/")[2];
      const targetModuleName = pageMap[oneDepthPath];

      const targetModule = await Promise.resolve(
        container.get(targetModuleName)
      ).then((factory) => factory().default);

      if (!targetModule) {
        setModule(null);
        return;
      }

      const reactModule = createElement(targetModule);

      console.log({ pageMap, oneDepthPath, targetModule });
      setModule(() => reactModule);

      // TODO: Get module from the container
    }

    if (!pathname) return;
    if (!remoteAppName) return;
    findModule();
  }, [pathname, remoteAppName]);

  return module;
}
