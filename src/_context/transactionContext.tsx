import {
  createContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

export interface transactionDataType {
  action: string;
  amount: number;
  createdAt: string;
  id: number;
  userId: number;
}

interface TransactionContextDataType {
  allTransactions: transactionDataType[] | [];
  setAllTransactions: Dispatch<SetStateAction<transactionDataType[] | []>>;
}

export const TransactionContext = createContext<TransactionContextDataType>({
  allTransactions: [],
  setAllTransactions: () => {},
});

function TransactionContextProvider({ children }: { children: ReactNode }) {
  const [allTransactions, setAllTransactions] = useState<
    transactionDataType[] | []
  >([]);

  return (
    <TransactionContext.Provider
      value={{ allTransactions, setAllTransactions }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export default TransactionContextProvider;
