{ nixpkgs ? <nixpkgs>
, declInput ? {}
, prsJSON ? ./simple-pr-dummy.json
}:
let pkgs = import nixpkgs {};

    prs = builtins.fromJSON (builtins.readFile prsJSON );

    mkGitSrc = { repo, branch ? "refs/heads/master" }: {
      type = "git";
      value = repo + " " + branch + " leaveDotGit";
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
            repo = "https://github.com/input-output-hk/ethereum-explorer.git";
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
      ++
      (pkgs.lib.mapAttrsToList
        (
          num:
          info:
            mkJob {
              name = "eth-explorer-PR-${num}";
              description = info.title;
              explorerBranch = info.head.sha;
            }
        )
        prs
      )
    );
in {
  jobsets = pkgs.runCommand "spec.json" {} ''
    cat <<EOF
    ${builtins.toXML declInput}
    EOF

    tee $out <<EOF
    ${builtins.toJSON jobsetDefinition}
    EOF
  '';
}
