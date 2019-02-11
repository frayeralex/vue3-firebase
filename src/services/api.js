import db, { auth } from "./firebase";

const COLLECTIONS = {
  USERS: "users"
};

const mapCollectionData = item => ({
  id: item.id,
  ...item.data()
});

export const getUsers = async () => {
  const querySnapshot = await db
    .collection(COLLECTIONS.USERS)
    .where('ownerID', '==', auth.currentUser.uid)
    .get();
  const result = [];
  querySnapshot.forEach(item => {
    result.push(mapCollectionData(item));
  });
  return result;
};
const user = {
  getAll: async () => {
    const result = [];
    const querySnapshot = await db.collection(COLLECTIONS.USERS).get();
    querySnapshot.forEach(item => {
      result.push(mapCollectionData(item));
    });
    return result;
  },
  getById: async id => {
    const user = await db
      .collection(COLLECTIONS.USERS)
      .doc(id)
      .get();

    return user.data();
  },
  create: async data => {
    const docRef = await db.collection(COLLECTIONS.USERS).add(data);
    return docRef;
  },
  update: async (id, data) => {
    const docRef = await db
      .collection(COLLECTIONS.USERS)
      .doc(id)
      .get();
    await docRef.ref.update(data);
  },
  deleteById: async id => {
    return await db
      .collection(COLLECTIONS.USERS)
      .doc(id)
      .delete();
  }
};
export default {
  user
};
