{ nixpkgs ? <nixpkgs>
, ethExplorerSrc ? ./.
}:
let
  listVersions = derivations: pkgs.stdenv.mkDerivation {
    name = "versions";
    src = ./.;
    buildInputs = [ pkgs.git ];
    installPhase =
      builtins.concatStringsSep "\n"
        (
          [ "mkdir $out" ]
          ++
          (builtins.map
            (derivation: ''
                (
                  cd ${derivation.src}
                  SHA=`git rev-parse HEAD || echo UNKNOWN`
                  printf "%40s %s\n" $SHA ${derivation.name}
                ) >> $out/versions.txt
             '')
             derivations)
        );
  };
in with import nixpkgs {}; {
  versions = listVersions [ ethExplorer ];

  ethExplorer = callPackage ./. {
    inherit ethExplorerSrc;
  };
}
