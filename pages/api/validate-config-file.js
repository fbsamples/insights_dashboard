import { getAppConfig } from '../../utils/config';
import config_file_errors from '../../constants/config-file-errors.json';

export default async function handler(req, res) {
  const config = getAppConfig();
  const type = req.query.type;

  const errors = [];

  for (const [field, errorObj] of Object.entries(config_file_errors[type])) {
    if (!config[field]) {
      errors.push({ field_name: field, ...errorObj });
    }
  }

  res.status(200).json({ errors });
}
