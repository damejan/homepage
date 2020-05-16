const restoreBookmarks = () => {
  const bookmarks = localStorage.getItem('bookmarks');
  if (bookmarks) {
    return JSON.parse(bookmarks);
  }
  localStorage.setItem('bookmarks', JSON.stringify({ bookmarks: [] }));
  return JSON.parse(localStorage.getItem('bookmarks'));
};

export default async (originalValue, parsedValue) => {
  if ('name' in parsedValue.flags && 'url' in parsedValue.flags) {
    const { name, url } = parsedValue.flags;
    const bookmarks = restoreBookmarks();
    bookmarks.bookmarks.push({ name, url });
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    return '<span style="color: green">bookmark added succesfully</span>';
  }
  return 'error, --name and --url are required';
};
