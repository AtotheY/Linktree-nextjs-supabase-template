-- First, drop the existing functions to avoid conflicts
DROP FUNCTION IF EXISTS get_analytics(timestamp, timestamp);
DROP FUNCTION IF EXISTS get_analytics(date, date);

-- Now create the new function
CREATE OR REPLACE FUNCTION get_analytics(start_date date, end_date date)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    WITH visits AS (
        SELECT COUNT(*) as total_visits
        FROM link_analytics
        WHERE event_type = 'visit'
          AND created_at >= start_date
          AND created_at < (end_date + INTERVAL '1 day')
    ),
    total_clicks AS (
        SELECT COUNT(*) as total_clicks
        FROM link_analytics
        WHERE event_type = 'click'
          AND created_at >= start_date
          AND created_at < (end_date + INTERVAL '1 day')
    ),
    clicks_by_link AS (
        SELECT link_id, COUNT(*) as total_clicks
        FROM link_analytics
        WHERE event_type = 'click'
          AND created_at >= start_date
          AND created_at < (end_date + INTERVAL '1 day')
        GROUP BY link_id
        ORDER BY total_clicks DESC
    ),
    views_by_country AS (
        SELECT country, COUNT(*) as total_views
        FROM link_analytics
        WHERE event_type = 'visit'
          AND created_at >= start_date
          AND created_at < (end_date + INTERVAL '1 day')
        GROUP BY country
        ORDER BY total_views DESC
    ),
    views_by_referrer AS (
        SELECT source, COUNT(*) as total_views
        FROM link_analytics
        WHERE event_type = 'visit'
          AND created_at >= start_date
          AND created_at < (end_date + INTERVAL '1 day')
        GROUP BY source
        ORDER BY total_views DESC
    ),
    views_over_time AS (
        SELECT created_at::date as date, 
               COUNT(*) FILTER (WHERE event_type = 'visit') as total_visits,
               COUNT(*) FILTER (WHERE event_type = 'click') as total_clicks
        FROM link_analytics
        WHERE created_at >= start_date
          AND created_at < (end_date + INTERVAL '1 day')
        GROUP BY date
        ORDER BY date ASC
    )
    SELECT json_build_object(
        'date_range', json_build_object('start_date', start_date, 'end_date', end_date),
        'total_visits', (SELECT total_visits FROM visits),
        'total_clicks', (SELECT total_clicks FROM total_clicks),
        'clicks_by_link', COALESCE((SELECT json_agg(row_to_json(clicks_by_link)) FROM clicks_by_link), '[]'::json),
        'views_by_country', COALESCE((SELECT json_agg(row_to_json(views_by_country)) FROM views_by_country), '[]'::json),
        'views_by_referrer', COALESCE((SELECT json_agg(row_to_json(views_by_referrer)) FROM views_by_referrer), '[]'::json),
        'views_over_time', COALESCE((SELECT json_agg(row_to_json(views_over_time)) FROM views_over_time), '[]'::json)
    ) INTO result;

    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Add this new function to your existing rpc.sql file

CREATE OR REPLACE FUNCTION get_recent_actions(limit_count integer DEFAULT 10)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    WITH recent_actions AS (
        SELECT 
            event_type,
            link_id,
            country,
            created_at
        FROM link_analytics
        ORDER BY created_at DESC
        LIMIT limit_count
    )
    SELECT json_agg(row_to_json(recent_actions))
    INTO result
    FROM recent_actions;

    RETURN result;
END;
$$ LANGUAGE plpgsql;