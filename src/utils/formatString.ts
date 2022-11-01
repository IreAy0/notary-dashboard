export function getFileType(url: any) {
  const fileType = url && url.split(/[#?]/)[0].split('.').pop().trim();

  return fileType;
}

export function getFileName(url: any) {
  const fileType = url && url.substr(0, url.lastIndexOf("."));

  return fileType;
}
