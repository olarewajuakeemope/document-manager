

module.exports = {
  up(queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Documents', [
      {
        title: 'Alice',
        content: 'Alice in wonderland with her boyfriend',
        ownerId: 1,
        ownerRoleId: 1,
        access: 'private',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'The Rings',
        content: 'The fellowship of the ring starring jack bauer',
        ownerId: 2,
        ownerRoleId: 2,
        access: 'role',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Our chance',
        content: 'This is the child of my brain, the product of my endeavour',
        ownerId: 2,
        ownerRoleId: 2,
        access: 'public',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Ice & magic',
        content: 'In the mist, there was ice and fire and magic!',
        ownerId: 2,
        ownerRoleId: 2,
        access: 'public',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'YOLO',
        content: 'You only live once',
        ownerId: 2,
        ownerRoleId: 2,
        access: 'public',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Born To Lead',
        content: 'My destiny is to lead and yours is to follow',
        ownerId: 2,
        access: 'public',
        ownerRoleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Fire & Snow',
        content: 'The land was filled with fire and snow',
        ownerId: 2,
        ownerRoleId: 2,
        access: 'public',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Kung-fu kenny',
        content: 'To pimp a butterfly',
        ownerId: 2,
        ownerRoleId: 2,
        access: 'role',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Fair beauty',
        content: 'How i wonder how fairer you could be',
        ownerId: 2,
        ownerRoleId: 2,
        access: 'public',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'The Goat',
        content: 'I am the GOAT',
        ownerId: 2,
        ownerRoleId: 2,
        access: 'public',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Epic',
        content: 'excellence passion integrity commitment',
        ownerId: 2,
        ownerRoleId: 2,
        access: 'public',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Nadine',
        content: 'The land was filled with fire and snow',
        ownerId: 2,
        ownerRoleId: 2,
        access: 'public',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'How to kill nemo',
        content: 'To pimp a butterfly',
        ownerId: 2,
        ownerRoleId: 2,
        access: 'role',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Dark beauty',
        content: 'How i wonder how fairer you could be',
        ownerId: 2,
        ownerRoleId: 2,
        access: 'public',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'The Life',
        content: 'I am the GOAT',
        ownerId: 2,
        ownerRoleId: 2,
        access: 'public',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Iota',
        content: 'excellence passion integrity commitment',
        ownerId: 2,
        ownerRoleId: 2,
        access: 'public',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {
      returning: true
    });
  },

  down(queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Documents', null, {});
  }
};
