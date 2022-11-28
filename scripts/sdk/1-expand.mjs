import { environment } from '../../lib/contentful.mjs';
import chalk from 'chalk';

(async function () {
  // Create the Author content type.
  let author = await environment.createContentTypeWithId('author', {
    name: 'Author',
    description: 'An individual blog author.',
    displayField: 'internalTitle',
    fields: [
      {
        id: 'internalTitle',
        name: 'Internal Title',
        type: 'Symbol',
        required: true,
        localized: false,
        disabled: false,
        omitted: false,
      },
      {
        id: 'firstName',
        name: 'First Name',
        type: 'Symbol',
        required: true,
        localized: false,
        disabled: false,
        omitted: false,
      },
      {
        id: 'lastName',
        name: 'Last Name',
        type: 'Symbol',
        required: true,
        localized: false,
        disabled: false,
        omitted: false,
      },
    ],
  });
  // Save the content type and get the returned, updated content type back from the API.
  author = await author.update();
  // Publish the content type.
  author = await author.publish();
  // Log out successful content type creation.
  console.log(chalk.green(`Created Author content type.`));

  // Update the Blog Post content type.`
  let blogPost = await environment.getContentType('blogPost');
  // Add an Author reference field to the content type definition.
  // Splice is used to place it at a certain order within the type.
  blogPost.fields.splice(2, 0, {
    id: 'authorRef',
    name: 'Author',
    type: 'Link',
    linkType: 'Entry',
    localized: false,
    required: true,
    disabled: false,
    omitted: false,
    validations: [
      {
        linkContentType: ['author'],
      },
    ],
  });

  // Save the content type and get the returned, updated content type back from the API.
  blogPost = await blogPost.update();
  // Publish the content type.
  blogPost = await blogPost.publish();
  // Log out successful field addition to Blog Post content type.
  console.log(chalk.green(`Added Author reference field to Blog Post content type.`));
})();
