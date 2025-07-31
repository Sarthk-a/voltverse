function readPackage(pkg) {
  if (pkg.name === 'sharp') {
    pkg.requiresBuild = true;
  }
  return pkg;
}

module.exports = {
  hooks: {
    readPackage
  }
};