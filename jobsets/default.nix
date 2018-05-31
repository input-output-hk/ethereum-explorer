{ nixpkgs ? <nixpkgs>
, declInput ? {}
}:
let pkgs = import nixpkgs {};

    mkGitSrc = { repo, branch ? "refs/heads/master" }: {
      type = "git";
      value = repo + " " + branch;
      emailresponsible = false;
    };

    mkJob = { name, description, explorerBranch }: {
      inherit name;
      value = {
        description = "Explorer - ${description}";
        nixexprinput = "src";
        nixexprpath = "release.nix";

        inputs = {
          src = mkGitSrc {
            # This isn't public-access, so cannot be accessed over HTTP(S).
            # Access with git@ and ensure the hydra host's keys will be accepted.
            repo = "git@github.com:input-output-hk/ethereum-explorer.git";
            branch = explorerBranch;
          };

          nixpkgs = mkGitSrc {
            repo = "https://github.com/NixOS/nixpkgs.git";
            branch = "06c576b0525da85f2de86b3c13bb796d6a0c20f6";
          };
        };
        enabled = 1;
        hidden = false;
        checkinterval = 300;
        schedulingshares = 100;
        emailoverride = "";
        enableemail = false;
        keepnr = 3;
      };
    };

    jobsetDefinition = pkgs.lib.listToAttrs (
      [
        (mkJob {
          name = "master";
          description = "Master";
          explorerBranch = "refs/heads/master";
        })
      ]
    );
in {
  jobsets = pkgs.runCommand "spec.json" {} ''
    cat <<EOF
    ${builtins.toXML declInput}
    EOF

    cat > $out <<EOF
    ${builtins.toJSON jobsetDefinition}
    EOF
  '';
}
