export const convertToBase64 = (file, cb) => {
  let reader = new FileReader();

  if (typeof file === "string" || file instanceof String) {
    return cb(file);
  }

  reader.readAsDataURL(file);
  reader.onload = function() {
    cb(reader.result);
  };
  reader.onerror = function(error) {
    console.log("Error: ", error);
  };
};
