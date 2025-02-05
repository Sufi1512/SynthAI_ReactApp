export interface ApiResponse {
  result: string;
  error?: string;
  loading?: boolean;
}

export interface ModelProps {
  onSubmit: (input: string) => Promise<void>;
  result: string;
  loading: boolean;
  error?: string;
}