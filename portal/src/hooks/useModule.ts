import { useEffect, useState } from "react";
import { injectScript } from "@module-federation/utilities";

const remoteVars = process.env.REMOTES || {};

export default function useModule(pathname: string, remoteAppName: string) {
  const [module, setModule] = useState(undefined);

  useEffect(() => {
    async function findModule() {
      const foundContainer = injectScript(remoteAppName);
      const container = await foundContainer;

      console.log({ foundContainer, container });

      container
        .get("./page-map")
        .then((factory) => console.log(factory().default))
    }

    if (!pathname) return;
    if (!remoteAppName) return;
    findModule();
  }, [pathname, remoteAppName]);

  return module;
}
