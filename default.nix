{ stdenv, ethExplorerSrc, nodejs, yarn, fetchurl, linkFarm, lib }:

let
  yarnDeps = import ./yarn.nix { inherit fetchurl linkFarm; };
  offlineCache = yarnDeps.offline_cache;
in stdenv.mkDerivation {
  src = ethExplorerSrc;

  name = "eth-explorer";

  buildInputs = [ nodejs yarn ];

  configurePhase = ''
    export HOME="$NIX_BUILD_TOP"

    yarn config --offline set yarn-offline-mirror ${offlineCache}

    yarn install --offline --frozen-lockfile --ignore-engines --ignore-scripts
  '';

  buildPhase = "yarn run build";

  installPhase = "mv build $out";
}
