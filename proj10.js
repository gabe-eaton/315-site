document.addEventListener('DOMContentLoaded', function() {
    // Puzzle pieces data - each piece has an id, display value, and correct position
    const puzzlePieces = [
        { id: 1, value: '3', position: 0 },
        { id: 2, value: '+', position: 1 },
        { id: 3, value: '4', position: 2 },
        { id: 4, value: '×', position: 3 },
        { id: 5, value: '5', position: 4 },
        { id: 6, value: '-', position: 5 },
        { id: 7, value: '2', position: 6 },
        { id: 8, value: '=', position: 7 },
        { id: 9, value: '21', position: 8 }
    ];
    
    // Game state variables
    let timer;                  // Holds the timer interval
    let seconds = 0;            // Tracks elapsed time
    let isGameActive = false;   // Flag to check if game is currently active
    let solvedPieces = 0;       // Tracks how many pieces are in their correct positions
    let bestTime = localStorage.getItem('bestPuzzleTime') || null;  // Best time from localStorage
    
    // DOM element references
    const puzzleBoard = document.getElementById('puzzleBoard');
    const timerDisplay = document.querySelector('.timer');
    const resetBtn = document.getElementById('resetBtn');
    const successMessage = document.getElementById('successMessage');
    const completionTimeDisplay = document.getElementById('completionTime');
    const bestTimeDisplay = document.getElementById('bestTime');
    
    // Update best time display if exists in localStorage
    if (bestTime) {
        bestTimeDisplay.textContent = `${bestTime}s`;
    }
    
    /**
     * Initialize the puzzle game
     * Creates and shuffles puzzle pieces, sets up drag and drop events, and starts the timer
     */
    function initPuzzle() {
        // Clear board
        puzzleBoard.innerHTML = '';
        
        // Reset game state
        seconds = 0;
        solvedPieces = 0;
        timerDisplay.textContent = 'Time: 0s';
        successMessage.style.display = 'none';
        
        // Shuffle pieces before displaying
        const shuffledPieces = [...puzzlePieces];
        shuffleArray(shuffledPieces);
        
        // Create puzzle pieces and add to the board
        shuffledPieces.forEach((piece, index) => {
            const pieceElement = document.createElement('div');
            pieceElement.className = 'puzzle-piece';
            pieceElement.textContent = piece.value;
            pieceElement.id = `piece-${piece.id}`;
            pieceElement.setAttribute('data-id', piece.id);
            pieceElement.setAttribute('data-correct-position', piece.position);
            pieceElement.setAttribute('data-current-position', index);
            pieceElement.draggable = true;
            
            puzzleBoard.appendChild(pieceElement);
        });
        
        // Add event listeners for drag and drop - using event delegation
        // This ensures events are properly handled even after DOM updates
        puzzleBoard.addEventListener('dragstart', handleDragStart);
        puzzleBoard.addEventListener('dragover', handleDragOver);
        puzzleBoard.addEventListener('dragenter', handleDragEnter);
        puzzleBoard.addEventListener('dragleave', handleDragLeave);
        puzzleBoard.addEventListener('dragend', handleDragEnd);
        puzzleBoard.addEventListener('drop', handleDrop);
        
        // Check initial positions (in case any piece starts in correct spot)
        checkAllPieces();
        
        // Start the timer
        if (timer) clearInterval(timer);
        timer = setInterval(updateTimer, 1000);
        isGameActive = true;
    }
    
    /**
     * Update the timer display
     * Increments the seconds counter and updates the display
     */
    function updateTimer() {
        if (isGameActive) {
            seconds++;
            timerDisplay.textContent = `Time: ${seconds}s`;
        }
    }
    
    /**
     * Shuffle array using Fisher-Yates algorithm
     * @param {Array} array - The array to shuffle
     * @return {Array} - The shuffled array
     */
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    /**
     * Handle the start of drag operation
     * @param {DragEvent} e - The dragstart event
     */
    function handleDragStart(e) {
        // Ensure we're operating on a puzzle piece
        if (!e.target.classList.contains('puzzle-piece')) return;
        
        // Don't allow dragging pieces that are already in correct position
        if (e.target.classList.contains('correct')) {
            e.preventDefault();
            return;
        }
        
        e.target.classList.add('dragging');
        
        // Store the dragged element ID to identify it later
        e.dataTransfer.setData('text/plain', e.target.id);
        e.dataTransfer.effectAllowed = 'move';
    }
    
    /**
     * Handle the dragover event
     * @param {DragEvent} e - The dragover event
     */
    function handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault(); // Necessary to allow dropping
        }
        
        // Only handle dragover for puzzle pieces
        if (e.target.classList.contains('puzzle-piece')) {
            e.dataTransfer.dropEffect = 'move';
        }
        
        return false;
    }
    
    /**
     * Handle the dragenter event
     * @param {DragEvent} e - The dragenter event
     */
    function handleDragEnter(e) {
        // Only add visual cue to puzzle pieces
        if (e.target.classList.contains('puzzle-piece')) {
            e.target.classList.add('over');
        }
    }
    
    /**
     * Handle the dragleave event
     * @param {DragEvent} e - The dragleave event
     */
    function handleDragLeave(e) {
        // Remove visual cue
        if (e.target.classList.contains('puzzle-piece')) {
            e.target.classList.remove('over');
        }
    }
    
    /**
     * Handle the dragend event
     * @param {DragEvent} e - The dragend event
     */
    function handleDragEnd(e) {
        // Remove all visual indicators
        document.querySelectorAll('.puzzle-piece').forEach(piece => {
            piece.classList.remove('dragging');
            piece.classList.remove('over');
        });
    }
    
    /**
     * Handle the drop event
     * @param {DragEvent} e - The drop event
     */
    function handleDrop(e) {
        e.preventDefault();
        
        // Only proceed if dropping onto a puzzle piece
        if (!e.target.classList.contains('puzzle-piece')) return false;
        
        // Get dragged element
        const draggedId = e.dataTransfer.getData('text/plain');
        const draggedElement = document.getElementById(draggedId);
        
        // Don't do anything if dropping onto the same element or if target is locked
        if (draggedElement === e.target || e.target.classList.contains('correct')) {
            return false;
        }
        
        // Swap positions
        swapElements(draggedElement, e.target);
        
        // Check if pieces are in correct positions
        checkAllPieces();
        
        // Check if puzzle is completely solved
        checkPuzzleSolution();
        
        return false;
    }
    
    /**
     * Swap two elements in the grid
     * @param {HTMLElement} elem1 - First element
     * @param {HTMLElement} elem2 - Second element
     */
    function swapElements(elem1, elem2) {
        // Get current positions
        const pos1 = elem1.getAttribute('data-current-position');
        const pos2 = elem2.getAttribute('data-current-position');
        
        // Swap position attributes
        elem1.setAttribute('data-current-position', pos2);
        elem2.setAttribute('data-current-position', pos1);
        
        // Get all pieces, update their order, and re-append to board
        const pieces = Array.from(document.querySelectorAll('.puzzle-piece'));
        const sortedPieces = [...pieces].sort((a, b) => {
            return parseInt(a.getAttribute('data-current-position')) - 
                  parseInt(b.getAttribute('data-current-position'));
        });
        
        // Clear board and re-append in sorted order
        puzzleBoard.innerHTML = '';
        sortedPieces.forEach(piece => puzzleBoard.appendChild(piece));
    }
    
    /**
     * Check all pieces to see if they are in correct positions
     */
    function checkAllPieces() {
        solvedPieces = 0;
        document.querySelectorAll('.puzzle-piece').forEach(piece => {
            const currentPos = parseInt(piece.getAttribute('data-current-position'));
            const correctPos = parseInt(piece.getAttribute('data-correct-position'));
            
            if (currentPos === correctPos) {
                piece.classList.add('correct');
                solvedPieces++;
            } else {
                piece.classList.remove('correct');
            }
        });
    }
    
    /**
     * Check if the entire puzzle is solved
     * Displays success message and updates best time if applicable
     */
    function checkPuzzleSolution() {
        if (solvedPieces === puzzlePieces.length) {
            // Stop timer
            isGameActive = false;
            clearInterval(timer);
            
            // Show success message
            completionTimeDisplay.textContent = seconds;
            successMessage.style.display = 'block';
            
            // Update best time if current time is better
            if (!bestTime || seconds < parseInt(bestTime)) {
                bestTime = seconds;
                localStorage.setItem('bestPuzzleTime', bestTime);
                bestTimeDisplay.textContent = `${bestTime}s`;
            }
        }
    }
    
    // Reset button event listener
    resetBtn.addEventListener('click', initPuzzle);
    
    // Initialize puzzle on page load
    initPuzzle();
});