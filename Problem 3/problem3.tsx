//Estimate Time Taken: 4.5 hours~

interface WalletBalance {
  currency: string;
  amount: number;
}

//Ammendment 1:
//Make FormattedWalletBalance an extension from WalletBalance
interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

//Task 2: Creating the class Datasource
class Datasource {
  constructor(url) {
    this.url = url;
  }

  async getPrices() {
    try {
      const response = await fetch(this.url);
      if (!response.ok) {
        throw new Error(`Failed to fetch prices: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching prices:", error);
      throw error; // Re-throw for handling in the component
    }
  }
}

//Ammendment 2: 
// BoxProps should extend Props, since BoxProps is more specific.
interface BoxProps extends Props {

}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const [prices, setPrices] = useState<Record<string, number>>({});

  useEffect(() => {
    const datasource = new Datasource("https://interview.switcheo.com/prices.json");
    datasource.getPrices().then(setPrices).catch(console.error);
  }, []); //Ammendment 3: Run only once on mount

  const getPriority = (blockchain: any): number => {
    switch (blockchain) {
      case 'Osmosis':
        return 100
      case 'Ethereum':
        return 50
      case 'Arbitrum':
        return 30
      case 'Zilliqa':
        return 20
      case 'Neo':
        return 20
      default:
        return -99
    }
  };

  const sortedBalances = useMemo(() => {
    return balances.filter((balance: WalletBalance) => {
      const balancePriority = getPriority(balance.blockchain);
      if (lhsPriority > -99 && balance.amount <= 0) { //Ammendment 4: combine the if conditions together
        return true;
      }
      return false;
    }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
      const leftPriority = getPriority(lhs.blockchain);
      const rightPriority = getPriority(rhs.blockchain);
      if (leftPriority > rightPriority) {
        return -1;
      } else if (rightPriority > leftPriority) {
        return 1;
      } else { // Ammdenment 5: added missing condition where rightPriority = leftPriority
        return 0
      }
    });
  }, [balances, prices]);

  // Ammdendment 6: Format directly within JSX for efficiency, but not so sure if i got it right....
  const rows = sortedBalances.map((balance, index) => (
    <WalletRow
      className={classes.row}
      key={index}
      amount={balance.amount}
      usdValue={prices[balance.currency] * balance.amount || 0}
      formattedAmount={balance.amount.toFixed()}
    />
  ));

  return (
    <div {...rest}>
      {rows}
    </div>
  )
};