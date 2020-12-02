require('gh-pages').publish('dist', {
  repo: 'https://github.com/artemkopylov04/vcw.git',
  email: 'slonjinmail@gmail.com',
}, (err) => {
  if (err) console.error(err);
  console.log('end');
});
