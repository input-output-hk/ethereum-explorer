{ nixpkgs ? <nixpkgs>
, ethExplorerSrc ? ./.
}:
with import nixpkgs {};
{
  ethExplorer = callPackage ./. {
    inherit ethExplorerSrc;
  };
}
