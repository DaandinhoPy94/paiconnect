# Analytics Event Specification - PaiConnect

## Event Naming Convention
All events use snake_case with descriptive, action-based names.

## Core Funnel Events

### 1. `page_view`
**When**: On every page load
**Properties**:
- `page_title`: Document title
- `page_path`: Current pathname
- `utm_source`: Marketing source
- `utm_medium`: Marketing medium  
- `utm_campaign`: Marketing campaign
- `utm_content`: Marketing content
- `utm_term`: Marketing term
- `referrer`: Document referrer
- `landing_path`: First page visited in session

### 2. `nav_click`
**When**: Navigation menu item clicked
**Properties**:
- `nav_item`: Menu item clicked (e.g., "diensten", "over", "faq")
- `current_page`: Page user was on when clicking
- All UTM + referrer properties

### 3. `cta_click`
**When**: Any call-to-action button clicked
**Properties**:
- `cta_text`: Button text (e.g., "Plan een intake")
- `cta_location`: Where on page (e.g., "hero", "footer", "navigation")
- `destination`: Target page/action
- All UTM + referrer properties

### 4. `service_select`
**When**: Service chosen in booking flow
**Properties**:
- `services`: Array of selected services
- `booking_step`: Current step in flow
- All UTM + referrer properties

### 5. `booking_start`
**When**: User enters booking flow (step 1)
**Properties**:
- `entry_point`: How they got there (e.g., "hero_cta", "nav_button")
- All UTM + referrer properties

### 6. `booking_submit_success`
**When**: Booking successfully submitted
**Properties**:
- `services`: Selected services (anonymized)
- `has_company`: Boolean if company provided
- `has_phone`: Boolean if phone provided
- `submission_time_seconds`: Time spent in flow
- All UTM + referrer properties

### 7. `booking_submit_fail`
**When**: Booking submission fails
**Properties**:
- `error_type`: Type of error (validation, network, server)
- `error_step`: Which step failed
- `services`: Selected services
- All UTM + referrer properties

## Privacy Compliance
- **NO PII**: Never track names, emails, phone numbers, or addresses
- **Anonymized Data**: Only track presence of data (has_company: true/false)
- **UTM Safe**: UTM parameters are marketing attribution, not personal data
- **GDPR Compliant**: All tracking respects user privacy preferences

## Implementation Notes
- Events fire immediately on action
- UTM parameters captured once per session and persisted
- Referrer captured on first page load
- All events include session context
- Failed events include error context for debugging