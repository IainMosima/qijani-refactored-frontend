export default function transportMoney(totalAmount: number) {
    if (totalAmount > 1000) {
      return 50;
    } else if (totalAmount >= 300 && totalAmount <= 1000) {
      return 40;
    } else {
      return 30;
    }
}