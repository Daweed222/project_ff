import React, {useState, useEffect, useCallback} from 'react';

const CategorySelector = (props) => {
    const {
        selectedCategory,
        changeCategory,
    } = props;

    const [categories, setCategories] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const fetchCategories = useCallback(() => {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'bf24658d49msh46709e845acf958p15a101jsnf5608fbade75',
                'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
            }
        };
        
        fetch('https://moviesdatabase.p.rapidapi.com/titles/utils/genres', options)
            .then(response => response.json())
            .then(response => {
                setCategories(response.results);
            })
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const toggleOpen = () => {
        setIsOpen(prevState => !prevState)
    }

    console.log('CategorySelector RENDER');
    return (
        <div className={`dropdown-container ${isOpen ? 'active' : ''}`} onClick={toggleOpen}>
            <div className='selected-value'>{selectedCategory !== '' ? selectedCategory : 'All'}</div>
            <div className='values-container'>
                <ul>
                    {categories.map((category, index) => (
                        <li key={index} onClick={(e) => {changeCategory(e.target.innerText); }}>
                            {category === null ? 'All' : category}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default React.memo(CategorySelector);