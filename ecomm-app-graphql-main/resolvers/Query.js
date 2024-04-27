exports.Query = {
  courses: (parent, args, { db: { courses, reviews } }) => {
    let filteredCourses = courses;
    const { filter } = args;

    if (filter) {
      const { discount, avgRating } = filter;
      if (discount)
        filteredCourses = filteredCourses.filter((product) => product.discount);
      if ([1, 2, 3, 4, 5].includes(avgRating)) {
        filteredCourses = filteredCourses.filter((item) => {
          let sum = 0;
          let numOfReviews = 0;
          reviews.forEach((review) => {
            if (review.courseId === item.id) {
              sum += review.rating;
              numOfReviews++;
            }
          });
          const avgCourseRating = sum / numOfReviews;
          return avgCourseRating >= avgRating;
        });
      }
    }
    return filteredCourses;
  },
  course: (parent, args, { db: { courses } }) => {
    const courseId = args.id;
    const course = courses.find((item) => item.id === courseId);
    if (!course) return null;
    else return course;
  },
  genres: (parent, args, { db: { genres } }) => genres,
  genre: (parent, args, { db: { genres } }) => {
    const catId = args.id;
    const genre = genres.find((item) => item.id === catId);
    if (!genre) return null;
    else return genre;
  },
  numOfCourses: () => {
    return 12;
  },
  price: () => {
    return 1465.98;
  },
  isTrainer: () => {
    return true;
  }
};
