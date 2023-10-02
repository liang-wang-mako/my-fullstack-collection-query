/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('books').del()
  await knex('books').insert([
    {
      id: 1,
      title: 'Ready Player One',
      author: 'Ernest Cline',
      add_by: 'auth0123',
    },
    {
      id: 2,
      title: 'Throwing Rocks at the Google Bus',
      author: 'Douglas Rushkoff',
      add_by: 'auth0123',
    },
    {
      id: 3,
      title: 'What Colour Is The Sky?',
      author: 'Laura Shallcrass',
      add_by: 'auth0123',
    },
    {
      id: 4,
      title: 'The Power of Letting Go',
      author: 'John Purkiss',
      add_by: 'google-oauth2|113123494959554683453',
    },
    {
      id: 5,
      title: 'The Power Of Positive Thinking',
      author: 'Norman Vincent Peale',
      add_by: 'google-oauth2|113123494959554683453',
    },
  ])
}
