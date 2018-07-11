const { GraphQLServer } = require('graphql-yoga');


let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}];

let idCount = links.length;

const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links,
    },
    Link: {
        id: (root) => root.id,
        description: (root) => root.description,
        url: (root) => root.url,
    },
    Mutation: {
        post: (root, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url,
            };
            links.push(link);
            return link;
        },
        updateLink: (root, args) => {
            const index = links.map(link => link.id).indexOf(args.id);
            if (index === -1) {
                throw new Error(`Post with id ${args.id} not found`);
            }
            if (args.url) {
                links[index].url = args.url;
            }
            if (args.description) {
                links[index].description = args.description;
            }
            
            return links[index];
        },
        deleteLink: (root, args) => {
            const index = links.map(link => link.id).indexOf(args.id);
            if (index > -1) {
                return links.splice(index, 1)[0];
            }
        },
    }
};

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
});
server.start(() => console.log(`Server is running on http://localhost:4000`));