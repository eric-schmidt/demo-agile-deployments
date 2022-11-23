import dotenv from 'dotenv';
import contentful from 'contentful-management';

// Init dotenv.
dotenv.config();

// Create and export the Contentful environment for use in other files.
export const environment = await new contentful.createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
})
  .getSpace(process.env.CONTENTFUL_SPACE_ID)
  .then((space) => space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT_ID))
  .then((env) => {
    return env;
  });
