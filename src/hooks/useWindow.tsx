

const useWindow = (elementWidth: number) => {

    if (document.documentElement.clientWidth !== 1920 ) {
        //how many pixels did we lose?
        const loss = 1920 - document.documentElement.clientWidth;

        const percentLoss = Math.round(loss / 19.2);

        const elementPercentLoss = (elementWidth / 100) * percentLoss;

        const newWidth = elementWidth - elementPercentLoss;

        return {  newWidth };
    } else {
        const newWidth = elementWidth;

        return {  newWidth };
    }

    }

export default useWindow;