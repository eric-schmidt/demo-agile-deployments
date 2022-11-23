import { environment } from '../../lib/contentful.mjs';

// This script disables the legacy Author field on the Blog Post content type.
(async function () {
  // Grab the content type
  let blogPost = await environment.getContentType('blogPost');

  // Find the author field and disable from the response.
  blogPost.fields.forEach((field) => {
    if (field.id === 'author') {
      field.omitted = true;
    }
  });

  // Save the content type and get the returned, updated content type back from the API.
  blogPost = await blogPost.update();
  // Publish the content type.
  blogPost = await blogPost.publish();
})();
