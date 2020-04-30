SELECT
    *
FROM
    errorEndpointErrors
WHERE
    -- environment LIKE '%%'
    -- AND
    (
        postedObject LIKE '%Required parameters missing%' OR
        postedObject LIKE '%Show detail not found%' OR
        postedObject LIKE '%Show Id is required%'
    )
;
