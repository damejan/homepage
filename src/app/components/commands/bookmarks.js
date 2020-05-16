const restoreBookmarks = () => {
  const bookmarks = localStorage.getItem('bookmarks');
  if (bookmarks) {
    return JSON.parse(bookmarks);
  }
  localStorage.setItem('bookmarks', JSON.stringify({ bookmarks: [] }));
  return JSON.parse(localStorage.getItem('bookmarks'));
};

export default async () => {
  const bookmarks = restoreBookmarks();
  let template = '<div style="display: flex; flex-flow: column wrap; align-items: flex-start;>';
  bookmarks.bookmarks.forEach((bookmark) => {
    template += `<a class="bookmarks-urls" 
    style="padding-bottom: 5px;" href="${bookmark.url}">${bookmark.name}</a>`;
  });
  template += '</div>';

  return template;
};
