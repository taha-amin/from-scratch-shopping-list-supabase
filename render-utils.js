export function renderItem(item) {
    //create div and p tag
    const div = document.createElement('div');
    const p = document.createElement('p');

    //depending on whether the shopping list is complete, give the div and the appropriate css class 'complete' or 'incomplete'
    div.classList.add(item.complete ? 'complete' : 'incomplete');

    //add the 'item' css class no matter what
    div.classList.add('item');

    //put the shopping lists text into the p tag
    p.textContent = item.todo;

    //append stuff
    div.append(p);
    
    //return the div
    return div;
}