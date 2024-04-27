const { v4: uuid } = require("uuid");

exports.Mutation = {
  addGenre: (parent, args, { db: { genres } }) => {
    const { input } = args;
    const { name } = input;
    const newGene = { id: uuid(), name };
    genres.push(newGene);
    return newGene;
  },
  addCourse: (parent, args, { db: { courses } }) => {
    const { input } = args;
    const { name, description, price, discount, genreId } = input;
    const newCourse = {
      id: uuid(),
      name,
      description,
      price,
      discount,
      genreId
    };
    courses.push(newCourse);
    return newCourse;
  },
  addReview: (parent, args, { db: { reviews } }) => {
    const { input } = args;
    const { date, title, comment, rating, courseId } = input;
    const newReview = { id: uuid(), date, title, comment, rating, courseId };
    reviews.push(newReview);
    return newReview;
  },
  deleteGenre: (parent, { id }, { db: { genres, courses } }) => {
    genres = genres.filter((genre) => genre.id !== id);
    courses = courses.map((course) => {
      if (course.genreId === id) {
        return { ...course, genreId: null };
      } else {
        return course;
      }
    });
    return true;
  },
  deleteCourse: (parent, { id }, { db: { courses, reviews } }) => {
    courses = courses.filter((course) => course.id !== id);
    reviews = reviews.filter((review) => review.courseId !== id);
    return true;
  },
  deleteReview: (parent, { id }, { db: { reviews } }) => {
    reviews = reviews.filter((review) => review.id !== id);
    return true;
  },
  updateGenre: (parent, { id, input }, { db: { genres } }) => {
    const index = genres.findIndex((genre) => genre.id === id);
    if (index === -1) return null;
    genres[index] = { ...genres[index], ...input };
    return genres[index];
  },
  updateCourse: (parent, { id, input }, { db: { courses } }) => {
    const index = courses.findIndex((course) => course.id === id);
    if (index === -1) return null;
    courses[index] = { ...courses[index], ...input };
    return courses[index];
  },
  updateReview: (parent, { id, input }, { db: { reviews } }) => {
    const index = reviews.findIndex((review) => review.id === id);
    if (index === -1) return null;
    reviews[index] = { ...reviews[index], ...input };
    return reviews[index];
  }
};
