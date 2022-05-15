export const asEther = (wei) => {
    return window.web3.utils.fromWei(wei, 'Ether');
};

export const asWei = (ether) => {
    return window.web3.utils.toWei(ether, 'Ether');
};