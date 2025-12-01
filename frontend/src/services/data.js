import { BookOpen, Users, Heart } from 'lucide-react';

export const booksData = [
    {
      id: 1,
      title: 'The Silent Patient',
      author: 'Alex Michaelides',
      genre: 'Thriller',
      year: 2019,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
      description: 'A gripping psychological thriller about a woman who shoots her husband and then never speaks again.'
    },
    {
      id: 2,
      title: 'Circe',
      author: 'Madeline Miller',
      genre: 'Mythology',
      year: 2018,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400&h=600&fit=crop',
      description: 'In the house of Helios, god of the sun and mightiest of the Titans, a daughter is born. But Circe is a strange child—not powerful, like her father, nor viciously alluring, like her...'
    },
    {
      id: 3,
      title: 'Educated',
      author: 'Tara Westover',
      genre: 'Memoir',
      year: 2018,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=600&fit=crop',
      description: 'An unforgettable memoir about a young girl who, kept out of school, leaves her survivalist family in the mountains of Idaho to pursue an education, and discovers the transformative...'
    },
    {
      id: 4,
      title: '1984',
      author: 'George Orwell',
      genre: 'Science Fiction',
      year: 1949,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop',
      description: 'A dystopian social science fiction novel and cautionary tale about the dangers of totalitarianism.'
    },
    {
      id: 5,
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      genre: 'Classic Literature',
      year: 1813,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop',
      description: 'A romantic novel of manners that follows the character development of Elizabeth Bennet.'
    },
    {
      id: 6,
      title: 'The Midnight Library',
      author: 'Matt Haig',
      genre: 'Literary Fiction',
      year: 2020,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop',
      description: 'Between life and death there is a library, and within that library, the shelves go on forever.'
    },
    // Add more books here if needed for the Books page
];

export const genresData = [
    {
      name: 'Mystery',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop',
      description: 'Unravel perplexing puzzles, follow cunning detectives, and delve into thrilling whodunits. This genre keeps readers on the edge of their seats with suspense, intrigue, and unexpected twists.'
    },
    {
      name: 'Historical Fiction',
      image: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=600&h=400&fit=crop',
      description: 'Journey back in time to experience pivotal moments and everyday life in bygone eras. Blending factual events with fictional narratives, these stories bring history to vivid life.'
    },
    {
      name: 'Science Fiction',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop',
      description: 'Venture into the future, explore distant galaxies, and ponder the impact of advanced technology. This genre challenges perceptions with speculative ideas, futuristic societies, and scientific possibilities.'
    },
    {
      name: 'Fantasy',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&h=400&fit=crop',
      description: 'Enter magical realms filled with mythical creatures, epic quests, and supernatural powers. Fantasy transports readers to imaginative worlds beyond reality.'
    }
];

export const statsData = [
    { icon: BookOpen, value: '1,000+', label: 'Books Available' },
    { icon: Users, value: '5,000+', label: 'Active Readers' },
    { icon: Heart, value: '10,000+', label: 'Reviews Shared' }
];