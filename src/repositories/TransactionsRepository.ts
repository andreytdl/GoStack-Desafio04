import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO{
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {

    let totalValueIncomeTransactions = 0;
    let totalValueOutcomeTransactions = 0;

    //Obtendo as transações do tipo income
    totalValueIncomeTransactions = this.transactions
    .filter(transaction => transaction.type === 'income')
    .map(x => x.value)
    .reduce((previousValue, currentValue) => previousValue + currentValue, 0);


    //Obtendo as transações do tipo outcome
    totalValueOutcomeTransactions = this.transactions
    .filter(transaction => transaction.type === 'outcome')
    .map(x => x.value)
    .reduce((previousValue, currentValue) => previousValue + currentValue, 0);

    const total = totalValueIncomeTransactions - totalValueOutcomeTransactions;

    const balance = {
      income: totalValueIncomeTransactions,
      outcome: totalValueOutcomeTransactions,
      total
    }

    return balance;

  };

  public create({type, title, value}: CreateTransactionDTO): Transaction {

    const transaction = new Transaction({title, value, type})
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
