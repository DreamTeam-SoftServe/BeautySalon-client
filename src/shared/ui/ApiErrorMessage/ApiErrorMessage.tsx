import { useI18n } from "../../i18n/context";
import { Button } from "../Button";
import { wrapStyle, titleStyle, bodyStyle } from "./ApiErrorMessage.styles";

interface ApiErrorMessageProps {
  error: (Error & { status?: number }) | null;
  onRetry?: () => void;
}

export function ApiErrorMessage({ error, onRetry }: ApiErrorMessageProps) {
  const { t } = useI18n();
  const isNetwork = (error as any)?.status === 0;

  return (
    <div style={wrapStyle}>
      <p style={titleStyle}>
        {isNetwork ? t.api.networkError : `${t.api.serverError} ${(error as any)?.status ?? ""}`}
      </p>
      <p style={bodyStyle}>
        {isNetwork ? t.api.networkDetail : (error?.message ?? t.booking.errors.server)}
      </p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" style={{ padding: "10px 24px" }}>
          {t.api.retry}
        </Button>
      )}
    </div>
  );
}