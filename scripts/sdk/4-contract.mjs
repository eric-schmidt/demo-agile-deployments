import { environment } from '../../lib/contentful.mjs';
import chalk from 'chalk';

// This script removes the legacy Author field from the Blog Post content type.
(async function () {
  // Grab the content type
  let blogPost = await environment.getContentType('blogPost');

  // Remove the author field from array of fields.
  blogPost.fields = blogPost.fields.filter((field) => field.id !== 'author');

  // Save the content type and get the returned, updated content type back from the API.
  blogPost = await blogPost.update();
  // Publish the content type.
  blogPost = await blogPost.publish();
  // Log out successful removal of Author text field from Blog Post content type.
  console.log(chalk.green(`Author text field deleted from Blog Post content type.`));
})();
