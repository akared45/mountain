export const mountainNameRegex = /^[a-zA-Z0-9\s-]{3,50}$/;
export const descriptionRegex = /^.{10,}$/;
export const latitudeRegex = /^([-+]?([1-8]?\d(\.\d+)?|90(\.0+)?))$/;
export const longitudeRegex = /^([-+]?((1[0-7]\d|[1-9]?\d)(\.\d+)?|180(\.0+)?))$/;
export const altitudeRegex = /^\d+(\.\d{1,2})?$/;
export const countryRegex = /^[a-zA-Z\s]{3,}$/;
export const regionRegex = /^[a-zA-Z\s-]{3,}$/;

export const nameRegex = /^[A-Za-z\s]+$/;
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const addressRegex = /^[A-Za-z0-9\s,.-]+$/;
