with import <nixpkgs> {};

stdenv.mkDerivation {
  name = "poolbase";

  buildInputs = [

    pkgs.nodejs-10_x
  ];
}
