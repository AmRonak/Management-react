// setIsFiltering(true);
const copy = [...fullData];
// setFilteredArray(copy);``
if (keyword) {
  setFilteredArray((prevState) =>
    prevState.filter((singleObject) => {
      let isTrue;
      for (let key in singleObject) {
        const everyKey = singleObject[key];
        if (
          typeof everyKey === "string" &&
          everyKey.toLowerCase().includes(keyword.toLowerCase())
        ) {
          isTrue = true;
          return isTrue;
        }
      }
      return isTrue;
    })
  );
} else {
  setIsFiltering(false);
}
