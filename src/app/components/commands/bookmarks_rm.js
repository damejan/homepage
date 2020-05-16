const restoreBookmarks = () => {
  const bookmarks = localStorage.getItem('bookmarks');
  if (bookmarks) {
    return JSON.parse(bookmarks);
  }
  localStorage.setItem('bookmarks', JSON.stringify({ bookmarks: [] }));
  return JSON.parse(localStorage.getItem('terminalConfig'));
};

export default async (originalValue, parsedValue) => {
  if ('name' in parsedValue.flags) {
    // const bookmarks = restoreBookmarks();
    const filtered = restoreBookmarks().bookmarks.filter(
      (el) => el.name !== parsedValue.flags.name,
    );
    localStorage.setItem('bookmarks', JSON.stringify({ bookmarks: filtered }));
    return '<span style="color: green">bookmarks removed succesfully</span>';
  }
  return 'error, --name is required';
};
